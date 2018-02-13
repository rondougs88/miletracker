$(document).one('pageinit', function () {

    //Show current runs
    showRuns();

    //Add Handler
    $('#submitAdd').on('tap', addRun);

    //Edit Handler
    $('#submitEdit').on('tap', editRun);

    //Clear runs handler
    $('#clearRuns').on('tap', clearRuns);

    //Delete Link Handler
    $('#stats').on('tap', '#deleteLink', deleteRun);

    //Set Current Handler
    $('#stats').on('tap', '#editLink', setCurrent);

    //Show all runs on homepage
    function showRuns() {
        //get runs object
        var runs = getRunsObject();

        //Check if empty
        if (runs != null && runs != '') {
            for (var i = 0; i < runs.length; i++) {

                $('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date: </strong>' + runs[i]["date"] +
                        '<br><strong>Distance: </strong>' + runs[i]["miles"] + ' mi' +
                        '<div class = "controls"><a href="#edit" id="editLink" data-miles="' + runs[i]["miles"] + '" data-date="' + runs[i]["date"] + '">Edit</a> | <a href="#" id="deleteLink" data-miles="' + runs[i]["miles"] + '" data-date="' + runs[i]["date"] + '" onclick="return confirm(\'Are you sure?\')">Delete</a></div></li>');

            }

            $('#home').bind('pageinit', function () {
                $('#stats').listview('refresh');
            });
        }
    }

    //Add a run
    function addRun() {
        //Get form values
        var miles = $('#addMiles').val();
        var date = $('#addDate').val();

        //Create 'run' object
        var run = {
            date: date,
            miles: parseFloat(miles)
        };

        var runs = getRunsObject();

        //Add new run to current runs array
        runs.push(run);

        alert('Run Added');

        //Set stringify object to localStorage
        localStorage.setItem('runs', JSON.stringify(runs));

        //Redirect
        window.location.href = "index.html";

        return false;
    }

    //Edit a run
    function editRun() {
        //Get current data
        var currentMiles = localStorage.getItem('currentMiles');
        var currentDate = localStorage.getItem('currentDate');

        var runs = getRunsObject();

        //Loop through runs and delete currently edited entry
        for (var i = 0; i < runs.length; i++) {
            if (runs[i].miles == currentMiles && runs[i].date == currentDate) {
                runs.splice(i, 1);
            }
        }

        // Put back to local storage
        localStorage.setItem('runs', JSON.stringify(runs));

        runs = getRunsObject();

        //Get form values
        var miles = $('#editMiles').val();
        var date = $('#editDate').val();

        //Create 'run' object
        var update_run = {
            date: date,
            miles: parseFloat(miles)
        };

        //Add new run to current runs array
        runs.push(update_run);

        alert('Run Edited');

        //Set stringify object to localStorage
        localStorage.setItem('runs', JSON.stringify(runs));

        //Redirect
        window.location.href = "index.html";

        return false;
    }

    //Delete run
    function deleteRun() {

        var r = confirm('Confirm Delete?');
        if (r == false) {
            return false;
        }

        //Get current data
        var currentMiles = $(this).data('miles');
        var currentDate = $(this).data('date');

        var runs = getRunsObject();

        //Loop through runs and delete currently edited entry
        for (var i = 0; i < runs.length; i++) {
            if (runs[i].miles == currentMiles && runs[i].date == currentDate) {
                runs.splice(i, 1);
            }
        }

        // Put back to local storage
        localStorage.setItem('runs', JSON.stringify(runs));

        alert('Run Deleted');

        //Redirect
        window.location.href = "index.html";

        return false;
    }

    //Clear runs
    function clearRuns() {

        var r = confirm('Confirm Clearing of All Runs?');
        if (r == false) {
            return false;
        }

        var runs = getRunsObject();

        localStorage.removeItem('runs');

        alert('Runs Cleared');

        //Redirect
        window.location.href = "index.html";

        return false;
    }

    function getRunsObject() {
        //Set runs array
        var runs = new Array();
        //Get current runs from local storage
        var currentRuns = localStorage.getItem('runs');

        //Check local storage
        if (currentRuns != null) {
            //Set to runs
            runs = JSON.parse(currentRuns);
        }

        //Return runs object
        return runs.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
    }

    //Set the current clicked miles and date
    function setCurrent() {
        //Set ls items
        localStorage.setItem('currentMiles', $(this).data('miles'));
        localStorage.setItem('currentDate', $(this).data('date'));

        //Insert form fields
        $('#editMiles').val(localStorage.getItem('currentMiles'));
        $('#editDate').val(localStorage.getItem('currentDate'));
    }
});