
$(document).ready(function(){
  var strHTMLOutput = '';
  $.ajax('/instrument/byuser/' + userID, {
    dataType: 'json',
    error: function(){
      console.log("ajax error :(");
    },
    success: function (data) {
      if (data.length > 0) {
        if (data.status && data.status === 'error'){
          strHTMLOutput = "<li>Error: " + data.error + "</li>";
        } else {
          var intItem,
              totalItems = data.length,
              arrLI = [];
          for (intItem = totalItems - 1; intItem >= 0; intItem--) {
            arrLI.push('<a href="/instrument/' + data[intItem]._id + '">'
	    + data[intItem].instrName + " [ S/N: " + data[intItem].instrSN + ",  Location: " + data[intItem].instrLocation + " ]" + "</a>" );
          }

          strHTMLOutput = "<li>" + arrLI.join('</li><li>') + "</li>";

        }
      }else{
        strHTMLOutput = "<li>No intruments were registererd yet</li>";
      }
      $('#myinstruments').html(strHTMLOutput);
    }
  });
});

                  




