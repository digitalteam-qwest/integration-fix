// Function to add the new column with the URL
function addUrlColumn() {
    function nodeListsAreEqual( list1, list2 ) {
        if (list1 === null || list2 === null) {
            return false
        } else if ( list1.length !== list2.length ) {
            return false;
        }
        return Array.from( list1 ).every( ( node, index ) => node === list2[ index ] );
    }
    
    // Select the rows in the table body
    const new_rows = document.querySelectorAll("#maintable-list > tbody > tr");

    const changed = !nodeListsAreEqual(new_rows,current_rows)

    // Check if the table body exists
    if (new_rows && changed) {
        current_rows = new_rows
  
        // Iterate over each row
        current_rows.forEach(row => {
            // Find the button with the class 'btn btn-primary edit_button pull-left'
            const editButton = row.querySelector('.btn.btn-primary.edit_button.pull-left');
    
            // Check if there's already a link in the row
            const hasAnchor = row.querySelector('a') !== null;

            console.log(hasAnchor)
            
            // Check if the button exists in the row
            if (editButton && !hasAnchor) {
                // Get the data-id attribute value
                const dataId = editButton.getAttribute('data-id');
        
                // Get the current page URL
                const currentUrl = window.location.origin;
        
                // Create the new URL using the data-id
                const newUrl = `${currentUrl}/admin/integrations/#integrations/edit/${dataId}`;
        
                // Create a new table cell (td) element
                const newCell = document.createElement('td');
        
                // Create an anchor (a) element for the URL
                const link = document.createElement('a');
                link.href = newUrl;
                link.textContent = 'open';
                //link.target = '_blank'; // Opens the link in a new tab
        
                // Append the link to the new cell
                newCell.appendChild(link);
        
                // Append the new cell to the current row
                row.appendChild(newCell);
            }
        });
    }

    return
}

function recursive_observer() {
    if (document.querySelector("#maintable-list > tbody")) {
        addUrlColumn()
    }
    setTimeout(recursive_observer, 1000);
}

let current_rows = null
recursive_observer()