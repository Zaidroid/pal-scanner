export const classifyProduct = (barcode: string): {
  country: string;
  classification: 'red' | 'orange' | 'green' | 'grey';
  message: string;
} => {
  // In a real app, this would call an API to get product origin
  // For demo purposes, we'll use the first 3 digits of barcode
  const prefix = barcode.substring(0, 3);

  switch (prefix) {
    case '729': // Israel
      return {
        country: 'Israel',
        classification: 'red',
        message: 'This product supports occupation',
      };
    case '840': // USA
      return {
        country: 'USA',
        classification: 'orange',
        message: 'This product may support occupation',
      };
    case '626': // Palestine
      return {
        country: 'Palestine',
        classification: 'green',
        message: 'Thank you for supporting Palestine',
      };
    default:
      return {
        country: 'Other',
        classification: 'grey',
        message: 'Origin information unavailable',
      };
  }
};
