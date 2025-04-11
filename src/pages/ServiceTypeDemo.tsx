
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ServiceTypeProvider } from '@/components/escorts/providers/ServiceTypeProvider';
import ServiceTypeSelection from '@/components/escorts/filters/ServiceTypeSelection';
import ServiceTypeRadioFilter from '@/components/escorts/filters/ServiceTypeRadioFilter';
import ServiceTypeBadgeLabel, { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';
import { useServiceType } from '@/components/escorts/context/ServiceTypeContext';
import { ForbiddenTerms, ServiceType } from '@/components/escorts/filters/ServiceTypeFilterRules';

const ServiceTypeInfo = () => {
  const {
    serviceType,
    selectedSpecializedTypes,
    validateServiceName,
    getSafeServiceName
  } = useServiceType();
  
  const [customServiceName, setCustomServiceName] = React.useState('');
  const [validationResult, setValidationResult] = React.useState<boolean | null>(null);
  const [safeServiceName, setSafeServiceName] = React.useState<string | null>(null);
  
  const handleValidate = () => {
    const isValid = validateServiceName(customServiceName);
    setValidationResult(isValid);
    
    const safeName = getSafeServiceName(customServiceName);
    setSafeServiceName(safeName);
  };
  
  return (
    <div className="space-y-4 mt-6">
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Selected Service Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Basic Service Type:</h4>
                {serviceType ? (
                  <ServiceTypeBadgeLabel type={serviceType} />
                ) : (
                  <span className="text-muted-foreground text-sm">No service type selected</span>
                )}
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Specialized Service Types:</h4>
                {selectedSpecializedTypes.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedSpecializedTypes.map(type => (
                      <div key={type} className="bg-secondary/40 px-3 py-1 rounded-md text-xs">
                        {type}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">No specialized types selected</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Validate Service Name</CardTitle>
            <CardDescription>Test our ethical service type system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Service Name</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customServiceName}
                    onChange={(e) => setCustomServiceName(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter a service name"
                  />
                  <Button onClick={handleValidate}>Validate</Button>
                </div>
              </div>
              
              {validationResult !== null && (
                <div className="text-sm">
                  <div className="font-medium mb-1">Result:</div>
                  <div className={validationResult ? "text-green-500" : "text-red-500"}>
                    {validationResult ? "Valid service" : "Invalid service"}
                  </div>
                  
                  {safeServiceName && safeServiceName !== customServiceName && (
                    <div className="mt-2">
                      <div className="font-medium mb-1">Remapped to:</div>
                      <div className="bg-secondary/40 px-3 py-1.5 rounded-md">
                        {safeServiceName}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-4 border-t pt-4">
                <div className="text-sm font-medium mb-2">Forbidden Terms:</div>
                <div className="flex flex-wrap gap-1.5">
                  {ForbiddenTerms.map(term => (
                    <div key={term} className="bg-destructive/10 px-2 py-0.5 rounded text-xs">
                      {term}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ServiceTypeDemo = () => {
  const [selectedType, setSelectedType] = React.useState<ServiceTypeFilter>("");
  
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Ethical Service Type System</h1>
          <p className="text-muted-foreground">
            Demonstrating the UberEscorts ethical service type filtering and validation
          </p>
        </div>
        
        <ServiceTypeProvider showWarningsOnRemap={true}>
          <Card>
            <CardHeader>
              <CardTitle>Service Type Selection</CardTitle>
              <CardDescription>
                Choose service types using our ethical filtering system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Enhanced Selection</h3>
                  <ServiceTypeSelection showSpecializedTypes={true} />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Radio Selection</h3>
                  <ServiceTypeRadioFilter
                    selectedType={selectedType}
                    onChange={setSelectedType}
                    includeSpecializedTypes={true}
                  />
                </div>
              </div>
              
              <ServiceTypeInfo />
            </CardContent>
          </Card>
        </ServiceTypeProvider>
      </div>
    </div>
  );
};

export default ServiceTypeDemo;
