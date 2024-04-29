 /* The following piece of code creates a link a colour contrast checker on WebAIM which tells you whether the given background and foreground colours have sufficient colour contrast. */
 
// Let `foregroundColour` be .
 const foregroundColour = ''.slice(1);

 // Let `backgroundColour` be .
 const backgroundColour = ''.slice(1);
 
 // Let `link` be .
 const link = `https://webaim.org/resources/contrastchecker/?fcolor=${foregroundColour}&bcolor=${backgroundColour}`;

 console.log(link);