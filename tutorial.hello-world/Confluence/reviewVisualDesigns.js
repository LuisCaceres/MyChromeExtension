/* This piece of code filters out non-relevant success criterion to make it faster to review visual designs. Use the following piece of code for web page: https://hq.ioof.com.au/pages/viewpage.action?pageId=830730691 */

// Let `nonRelevantSuccessCriterias` be a list of success criteria from WCAG.
const nonRelevantSuccessCriterias = [
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
    'Success Criterion 1.3.4 Orientation (Level AA)',
    'Success Criterion 1.4.2 Audio Control (Level A)',
    'Success Criterion 1.4.13 Content on Hover or Focus (Level AA)',
    'Success Criterion 2.1.1 Keyboard (Level A)',
    'Success Criterion 2.1.4 Character Key Shortcuts (Level A)',
    'Success Criterion 2.2.1 Timing Adjustable (Level A)',
    'Success Criterion 2.2.2 Pause, Stop, Hide (Level A)',
    'Success Criterion 2.3.1 Three Flashes or Below Threshold (Level A)',
    'Success Criterion 2.4.5 Multiple Ways (Level AA)',
    'Success Criterion 2.4.7 Focus Visible (Level AA)',
    'Success Criterion 2.5.1 Pointer Gestures (Level A)',
    'Success Criterion 2.5.2 Pointer Cancellation (Level A)',
    'Success Criterion 2.5.3 Label in Name (Level A)',
    'Success Criterion 2.5.4 Motion Actuation (Level A)',
    'Success Criterion 2.5.7 Dragging Movements (Level AA)',
    'Success Criterion 3.1.2 Language of Parts (Level AA)',
    'Success Criterion 3.2.6 Consistent Help (Level A)',
    'Success Criterion 3.3.4 Error Prevention (Legal, Financial, Data) (Level AA)',
    'Success Criterion 3.3.8 Accessible Authentication (Minimum) (Level AA)',
    'Success Criterion 3.3.7 Redundant Entry (Level A)',
  ];
  
  // Let `rows` be a list of table rows.
  const rows = [...$0.querySelectorAll('tr')];
  
  // For each row `row` in rows.
  for (const row of rows) {
    // Let `textContent` be the text content of the second cell in `row`.
    const textContent = row.cells[1].textContent.trim();
  
    // Let `successCriteria` be the success criteria in `textContent`.
    const successCriteria = nonRelevantSuccessCriterias.find(successCriteria => textContent.startsWith(successCriteria));
    
    // If `successCriteria` is in `nonRelevantSuccessCriterias`.
    if (successCriteria) {
        // Hide `row`.
        row.style.display = 'none';
    }
  }
  
  // For each row `row` in rows.
  for (const row of rows) {
    row.style.display = '';
  }