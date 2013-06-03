google.load("feeds", "1");
var result;

function initialize() {
  var feed = new google.feeds.Feed("http://feeds.feedburner.com/tedtalks_video");
  feed.setNumEntries(100);
  feed.load(function(result) {
    if (!result.error) {
      window.result = result;
      var container = document.getElementById('list');
      var list_container = document.createElement("ul");
      list_container.className = 'list-container';

      for (var i = 0; i < result.feed.entries.length; i++) {
        var entry = result.feed.entries[i];
        var entry_container = document.createElement("li");
        entry_container.setAttribute("data-order", i);
        entry_container.className = 'entry-container';
        var title = document.createElement("div");
        title.className = 'title';
        var date = document.createElement("div");
        date.className = 'date';
        var description = document.createElement("div");
        description.className = 'content-snippet';
        title.innerHTML = entry.title;
        date.innerHTML = entry.publishedDate;
        description.innerHTML = entry.contentSnippet;
        container.appendChild(list_container);
        list_container.appendChild(entry_container);
        entry_container.appendChild(title);
        entry_container.appendChild(date);
        entry_container.appendChild(description);
      }

      var first_entry = result.feed.entries[0];
      $('.detail-title').html(first_entry.title).parent().attr('href', first_entry.link);
      $('.detail-author').html(first_entry.author);
      $('.detail-date').html(first_entry.publishedDate);
      $('.detail-content').html(first_entry.content);
      $('#iframe').attr('src', first_entry.mediaGroups[0].contents[0].url);
      $('.entry-container:first').css("background-color", "#FAFAFA");
    }
  });
}

google.setOnLoadCallback(initialize);

$(document).on('click', '.entry-container', function(){
  var order = this.getAttribute('data-order');
  var current_entry = result.feed.entries[order];
  $('.detail-title').html(current_entry.title).parent().attr('href', current_entry.link);
  $('.detail-author').html(current_entry.author);
  $('.detail-date').html(current_entry.publishedDate);
  $('.detail-content').html(current_entry.content);
  $('#iframe').attr('src', current_entry.mediaGroups[0].contents[0].url);
  $('.entry-container').css("background-color", "#F4F4F4");
  $(this).css("background-color", "#FAFAFA");
});