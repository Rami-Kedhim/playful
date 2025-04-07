
/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy text to clipboard:', error);
    return false;
  }
};

/**
 * Read text from clipboard
 */
export const readFromClipboard = async (): Promise<string> => {
  try {
    const text = await navigator.clipboard.readText();
    return text;
  } catch (error) {
    console.error('Failed to read from clipboard:', error);
    return '';
  }
};
