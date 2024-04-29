 // Let `headings` be a list of.
const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

// For each heading `heading` in headings.
headings.forEach((heading, index) => {
    // Let `textContent` be .
    const textContent = heading.textContent.trim();
    // Let `level` be .
    const level = heading.nodeName.slice(1);
    // Let `indentation` be .
    const indentation = ''.padStart((level - 1) * 4);
    
    console.log(`${indentation}${level}: ${textContent}`);
});


 // Let `links` be .
 const links = [...document.querySelectorAll('a')];

 // For each link `link` in links.
 for (const link of links) {
    console.log(link.textContent.trim());
 }
 
 
