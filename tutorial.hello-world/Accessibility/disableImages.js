 // Let `images` be .
 const images = [...document.querySelectorAll('img')];

 // For each image `image` in images.
 for (const image of images) {
    image.removeAttribute('src');
    image.removeAttribute('srcset');
 }

// TO DO: Ensure that the cell is visible. 
 
 
