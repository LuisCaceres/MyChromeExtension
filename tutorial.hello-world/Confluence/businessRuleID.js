/* This piece of code updates the id of each business rule located in the "id"
column of the "business rules" table. For example, 'AC-1', 'AC-2'. This is useful 
when rows are inserted in the table. It avoids manual updating of the id of each 
business rule. */

const selector = 'td:first-of-type';

$0.querySelectorAll(selector).forEach((e, index) => {
    e.textContent = `AC-${index + 1}`;
});




const labels = ['Find out more', 'Learn more', 'Read more'];
const elements = [...document.querySelectorAll('a, h1, h2, h3, h4, h5, h6')];


const links = elements.filter(element => element.nodeName === 'A')
    .map(link => {
        let label = link.textContent.trim();

        if (labels.includes(label)) {
            let index = elements.indexOf(link);

            while (index-- && index >= 0) {
                const element = elements[index];

                if (element.nodeName !== 'A') {
                    label = `${label}: ${element.textContent.trim()}`;
                    break;
                }
            }
        }

        return label;
    })
    .filter(link => link !== '');

links.forEach((link, index) => {
    console.log(`${index + 1}. ${link}`);
});


 // Let `successCriterias` be .
 const successCriterias = [
    'Success Criterion 2.1.2 No Keyboard Trap (Level A)',
    'Success Criterion 2.4.1 Bypass Blocks (Level A)',
    'Success Criterion 2.4.2 Page Titled (Level A)',
    'Success Criterion 2.4.3 Focus Order (Level A)',
    'Success Criterion 3.1.1 Language of Page (Level A)',
    'Success Criterion 1.2.1 Audio-only and Video-only (Prerecorded) (Level A)',
    'Success Criterion 1.2.2 Captions (Prerecorded) (Level A)',
    'Success Criterion 1.2.3 Audio Description or Media Alternative (Prerecorded) (Level A)',
    'Success Criterion 1.2.4 Captions (Live) (Level AA)',
    'Success Criterion 1.2.5 Audio Description (Prerecorded) (Level AA)',
    'Success Criterion 1.3.5 Identify Input Purpose (Level AA)',
    'Success Criterion 1.4.2 Audio Control (Level A)',
    'Success Criterion 2.1.1 Keyboard (Level A)',
    'Success Criterion 2.1.4 Character Key Shortcuts (Level A)',
    'Success Criterion 2.2.1 Timing Adjustable (Level A)',
    'Success Criterion 2.2.2 Pause, Stop, Hide (Level A)',
    'Success Criterion 2.3.1 Three Flashes or Below Threshold (Level A)',
    'Success Criterion 2.4.7 Focus Visible (Level AA)',
    'Success Criterion 2.5.1 Pointer Gestures (Level A)',
    'Success Criterion 2.5.2 Pointer Cancellation (Level A)',
    'Success Criterion 2.5.4 Motion Actuation (Level A)',
    'Success Criterion 2.5.7 Dragging Movements (Level AA)',
    'Success Criterion 3.1.2 Language of Parts (Level AA)',
    'Success Criterion 3.3.4 Error Prevention (Legal, Financial, Data) (Level AA)',
    'Success Criterion 3.3.8 Accessible Authentication (Minimum) (Level AA)',
    'Success Criterion 3.3.7 Redundant Entry (Level A)',
 ];
 
 // Let `rows` be .
 const rows = [...$0.querySelectorAll('tr')];

 // For each row `row` in rows.
 for (const row of rows) {
    // Let `textContent` be.
    const textContent = row.textContent.trim();

    console.log(textContent);

    // Let `successCriteria` be .
    const successCriteria = successCriterias.find(successCriteria => textContent.startsWith(successCriteria));
    
    if (successCriteria) {
        row.style.display = 'none';
    }
 }

 // For each row `row` in rows.
 for (const row of rows) {
    row.style.display = '';
 }
 
 
 
 
