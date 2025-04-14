
// Follow Supabase Edge function format
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Function to store document in storage and record in database
async function processDocument(supabase, userId, type, file, category) {
  try {
    if (!file) return null;

    // Convert ArrayBuffer to Uint8Array for Supabase storage
    const fileData = new Uint8Array(file);
    
    // Generate file path with unique name
    const timestamp = new Date().getTime();
    const fileExtension = "jpg"; // Default to jpg for simplicity
    const filePath = `${userId}/${category}_${timestamp}.${fileExtension}`;
    
    // Upload to verification-documents bucket
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('verification-documents')
      .upload(filePath, fileData, {
        contentType: 'image/jpeg',
        upsert: true
      });
      
    if (uploadError) {
      throw new Error(`Error uploading ${category} document: ${uploadError.message}`);
    }

    // Get public URL for the file
    const { data: publicUrlData } = await supabase
      .storage
      .from('verification-documents')
      .getPublicUrl(filePath);

    return {
      type,
      category,
      fileUrl: publicUrlData.publicUrl,
      uploadedAt: new Date().toISOString(),
      status: 'pending'
    };
  } catch (error) {
    console.error(`Error processing ${category} document:`, error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Get Supabase client with service role key
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing Authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Extract token from header
    const token = authHeader.replace('Bearer ', '');
    
    // Create Supabase admin client for storage operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    // Create client using user's JWT for user-specific operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    
    // Get current user info
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid user token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Parse request body
    const requestData = await req.json();
    const { documentType, frontImage, backImage, selfieImage } = requestData;
    
    if (!documentType || !frontImage || !selfieImage) {
      return new Response(
        JSON.stringify({ error: "Missing required document data" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Process and store document images
    const documents = [];
    
    // Front image is required
    const frontDocument = await processDocument(
      supabaseAdmin, 
      user.id, 
      documentType, 
      frontImage, 
      'front'
    );
    if (frontDocument) documents.push(frontDocument);
    
    // Back image is optional (e.g., not needed for passports)
    if (backImage) {
      const backDocument = await processDocument(
        supabaseAdmin, 
        user.id, 
        documentType, 
        backImage, 
        'back'
      );
      if (backDocument) documents.push(backDocument);
    }
    
    // Selfie image is required
    const selfieDocument = await processDocument(
      supabaseAdmin, 
      user.id, 
      'selfie', 
      selfieImage, 
      'selfie'
    );
    if (selfieDocument) documents.push(selfieDocument);
    
    // Create verification request in the database
    const { data: verificationData, error: verificationError } = await supabaseAdmin
      .from('verification_requests')
      .insert({
        profile_id: user.id,
        requested_level: 'basic',
        documents: documents,
        status: 'pending'
      })
      .select('id')
      .single();
      
    if (verificationError) {
      throw new Error(`Error creating verification request: ${verificationError.message}`);
    }
    
    // Update user profile to indicate verification was submitted
    await supabaseAdmin
      .from('profiles')
      .update({ 
        verification_submitted: true,
        last_verification_request: new Date().toISOString()
      })
      .eq('id', user.id);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Verification submitted successfully",
        verificationId: verificationData.id
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error processing verification:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Failed to process verification",
        error: error.message
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
