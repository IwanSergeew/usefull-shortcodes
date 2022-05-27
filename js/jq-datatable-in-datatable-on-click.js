    // On Main table row click show inner table
    $('#main_table tbody').on('click', 'tr', showInnerTableOnTableRowClick);

    async function showInnerTableOnTableRowClick(e) {
        const target = e.currentTarget;
        const row_id = $(target).attr('row_id');
        // Table row has no id
        if(!row_id)   return;

        // Get if inner table for row exists
        const trCount = $(`tr[data-for-row="${row_id}"]`).length;
        // If there is an inner table for this row show it.
        if(trCount > 0) {
            // Show inner table only if there is data in it.
            if(trCount > 1 || !$(`tr[data-for-row="${row_id}"] td`).hasClass('dataTables_empty')) $(`tr[data-for-row="${row_id}"]`).toggle(100);
            return;
        }

        // Create a new row for the inner table of the row above
        const tr = document.createElement('tr');
        tr.setAttribute('data-for-row', row_id);
        // Hide the new inner table row and show after data is appended
        tr.style.display = 'none';
        const td = document.createElement('td');
        td.setAttribute('colspan', 10000);

        const table = document.createElement('table');
        table.classList = 'table table-sm table-striped table-condensed table-bordered table-hover bg-white dataTable no-footer';
        // Set unique table id
        table.id = `show_po_lines_inner${row_id}`;

        // Append table headers and the tbody tag to add the content to it
        $(table).append(`<thead>
            <th class="text-center">ID</th>
            <th class="text-center">Name</th>
            <th style="white-space: nowrap">Email</th>
            <th style="white-space: nowrap">Phone</th>
            <th style="white-space: nowrap">Type</th>
        </thead>
        <tbody></tbody>`);

        $(td).append(table);
        $(tr).append(td);
        $(target).after(tr);
        // add a new invisible row after the inner table row for some bugfixes
        $(target).after(`<tr style="display: none;"><td style="display: none;"></td></tr>`);

        // Create the datatable
        $(`#${table.id}`).dataTable({
            "bprocessing": true,
            "bserverSide": true,
            "sServerMethod": "POST",
            "sAjaxSource": `./data/data-get-inner-table.php?row_id=${row_id}`, // Get table data for this row_id from this file
            stateSave: true,
            "lengthMenu": [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],

            initComplete: function() {
                document.querySelector("[type='search']").style = "min-width:150px";

                // Show inner table only if there is data in it.
                if($(`#${table.id} tbody tr`).length > 1 || ($(`#${table.id} tbody tr`).length == 1 && !$(`#${table.id} tbody tr td`).hasClass('dataTables_empty'))) {
                    $(`tr[data-for-order="${row_id}"]`).toggle(300);
                }
            }

        });
    }
