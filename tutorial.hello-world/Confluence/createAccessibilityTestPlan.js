// Let `table` be the table that contains the list of success criteria level A and level AA from WCAG.
const table = document.querySelector('.wcag-22-success-criteria');
// Let `rows` be a list of rows in `table`.
const rows = [...table.rows];

// Let `relevantRows` be a list of rows in `rows` that have been marked as applicable.
const relevantRows = rows.filter(row => row.cells[0].textContent.includes('Yes'));

const testCases = {
		// Let `automatedTestCases` be an initially empty list of test cases that can be run automatically.
    'test-cases-automated': [],
		// Let `manualTestCases` be an initially empty list of test cases that can be run automatically.
    'test-cases-manual': [],
		// Let `screenReaderTestCases` be an initially empty list of test cases that can be run automatically.
    'test-cases-screen-reader': [],
}

// For each relevant row `relevantRow` in `relevantRows`.
relevantRows.forEach(relevantRow => {
		// Let `relevantCell` be the cell that contains test cases in `relevantRow`.
    const relevantCell = relevantRow.cells[2];
		// Let `testCaseLists` be a lists of list of test cases in `relevantCell`.
    const testCaseLists = relevantCell.querySelectorAll('ul[class^="test-cases"]');

    // For each testCaseList `testCaseList` in `testCaseLists`.
    for (const testCaseList of testCaseLists) {
				// Let `type` be the type of test case (automated, manual or screen reader).
        const type = testCaseList.classList.item(0);
				// Add each test case in `testCaseList` to the appropriate list of test cases. 
        testCases[type].push(...testCaseList.querySelectorAll('li'));
    }
});

const webPages = [...document.querySelectorAll('.web-pages li')].map(webPage => webPage.textContent);

const template = `
<h1>Accessibility test plan</h1>
<p>
	Copy the table below and use it as an accessibility test plan for your application or website. The table below should have a row per each web page to be tested.
</p>

<table>
		<thead>
				<tr>
						<th>Web page</th>	
						<th>Components</th>a
						<th>
							Test Cases and test outcome (P = Pass = <img class="emoticon emoticon-tick" src="/s/-6iy0oo/8804/1phjtiw/_/images/icons/emoticons/check.svg" data-emoticon-name="tick" alt="(tick)">, F = Failure = <img class="emoticon emoticon-cross" src="/s/-6iy0oo/8804/1phjtiw/_/images/icons/emoticons/error.svg" data-emoticon-name="cross" alt="(error)">, U = Unverified = <img class="emoticon emoticon-question" src="/s/-6iy0oo/8804/1phjtiw/_/images/icons/emoticons/help_16.svg" data-emoticon-name="question" alt="(question)">, W = Warning = <img class="emoticon emoticon-warning" src="/s/-6iy0oo/8804/1phjtiw/_/images/icons/emoticons/warning.svg" data-emoticon-name="warning" alt="(warning)">)
						</th>
						<th>Defect #</th>
						<th>Details of test</th>
				</tr>
		</thead>
		<tbody>
				${webPages.map(webPage => {
						return `
										<tr>
											<td>${webPage}</td>
											<td>
												????? (specify which components are located on this web page)
												<ul>
													<li>Component 1</li>
													<li>Component 2</li>
													<li>Component 3</li>
												</ul>
											</td>
											<td>
													<p><strong>Automated testing:</strong></p>
													<ol>
															${testCases["test-cases-automated"].map(testCase => {
																	return `<li>
																							<span style="color: #339966;" data-mce-style="color: #339966;"><strong>(U)</strong></span>
																							${testCase.textContent}
																					</li>`
															}).join('')}
													</ol>

													<p><strong>Manual testing:</strong></p>
													<ol>
															${testCases["test-cases-manual"].map(testCase => {
																	return `<li>
																							<span style="color: #339966;" data-mce-style="color: #339966;"><strong>(U)</strong></span>
																							${testCase.textContent}
																					</li>`
															}).join('')}
													</ol>

													<p><strong>Screen reader testing:</strong></p>
													<ol>
															${testCases["test-cases-screen-reader"].map(testCase => {
																	return `<li>
																							<span style="color: #339966;" data-mce-style="color: #339966;"><strong>(U)</strong></span>
																							${testCase.textContent}
																					</li>`
															}).join('')}
													</ol>
											</td>
											<td>
												<p><strong>Automated testing:</strong></p>
												<ol>
														${testCases["test-cases-automated"].map(testCase => {
															return `<li>Not applicable</li>`
														}).join('')}
												</ol>
												<p><strong>Manual testing:</strong></p>
												<ol>
														${testCases["test-cases-manual"].map(testCase => {
															return `<li>Not applicable</li>`
														}).join('')}
												</ol>
												<p><strong>Screen reader testing:</strong></p>
												<ol>
														${testCases["test-cases-screen-reader"].map(testCase => {
															return `<li>Not applicable</li>`
														}).join('')}
												</ol>
											</td>
											<td>
												<p><strong>Automated testing:</strong></p>
												<ol>
														${testCases["test-cases-automated"].map(testCase => {
															return `<li>Not applicable</li>`
														}).join('')}
												</ol>
												<p><strong>Manual testing:</strong></p>
												<ol>
														${testCases["test-cases-manual"].map(testCase => {
															return `<li>Not applicable</li>`
														}).join('')}
												</ol>
												<p><strong>Screen reader testing:</strong></p>
												<ol>
														${testCases["test-cases-screen-reader"].map(testCase => {
															return `<li>Not applicable</li>`
														}).join('')}
												</ol>
											</td>
									</tr>
						`
				}).join('')}
		</tbody>
</table>
<style>
	table {
		border-collapse: collapse;
	}

	td, th {
		padding: 1rem;
		border: solid;
		vertical-align: top;
	}
</style>
	`;

const children = (new DOMParser()).parseFromString(template, 'text/html').body.children;

// Let `tab` be a new browser tab.
const tab = window.open();
// Add `template` to `tab`.
tab.document.body.append(...children);