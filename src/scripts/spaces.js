var spaceSelections = $('#spaces [type=checkbox]');

var prefixSpacesTo = $('#prefixing');
var copyOtherSpacesTo = $('#commSpaces');
var otherSpacesTo = $('#otherSpaces');
var copyOtherSpacesFrom = $('#otherSpaceText');
var otherCheckbox = $('#otherSpace');
var onlineChoices = $('#spaces #onlineSpaces input[type=checkbox]');
var offlineChoices = $('#spaces #offlineSpaces input[type=checkbox]')
var selectedSpaces;

// empty the array from last time
selectedSpaces = [];
console.log(selectedSpaces);

// uncheck any from last time
$('#spaces input:checkbox:checked').each(function() {
  var $input = $(this);
  if ($input.prop('checked')) {
    $input.prop('checked', false);
  }
});

$(copyOtherSpacesFrom).keyup(function() {
  otherSpacesTo.text(this.value);
});

function matchSpaces(array, value, box) {
  // for every item in the on or offline array
  for (var i=0; i < array.length; i++) {
    // compare elements and if found
    if (value == array[i].value){
      // and if you are checking the box
      if ($(box).is(':checked')) {
        // add the value to the list of selected spaces
        selectedSpaces.push(array[i].value);
        // update text
        $(copyOtherSpacesTo).text(selectedSpaces);
      } else {
        // double check the item you're unchecking is in the array
        var index = $.inArray(value, selectedSpaces);
        // remove the value from the list of selected spaces
        if(index != -1) {
          selectedSpaces.splice(index, 1);
          if (selectedSpaces.length < 1) {
            $('#prefixing').hide();
          }
          // update text
          $(copyOtherSpacesTo).text(selectedSpaces);
        }
      }
    }
  }
}

// when a checkbox is clicked on
$('#spaces input[type=checkbox]').click(function() {
  var clickedCheckbox = this;
  var clickedValue = this.value;
  if ($(copyOtherSpacesTo).text('')) {
    $('#prefixing').show();
  }
  // if space is Other
  if (clickedValue == 'other') {
    if ($(otherCheckbox).is(':checked')) {
      $(copyOtherSpacesFrom).prop('disabled', false);
    } else if ($(otherCheckbox).not(':checked')) {
      $(copyOtherSpacesFrom).prop('disabled', true);
      $('#otherSpaces').text('');
    }
  } else {
    if ($('body').hasClass('onlineUsage')) {
      matchSpaces(onlineChoices,clickedValue,clickedCheckbox)
    }
    if ($('body').hasClass('offlineUsage')) {
      matchSpaces(offlineChoices,clickedValue,clickedCheckbox)
    }
  }
});
