$(document).ready(function () {
  var events = [
    {
      title: "Funeral",
      description: "Description for Funeral event",
      start: "2024-01-15T09:00",
      end: '2024-01-15T10:00'
    },
    {
      title: 'Abza\'s Wedding',
      description: "Description for Abza's Wedding event",
      start: '2024-02-12T02:30'
    },
    {
      title: 'Blood Donatiion',
      description: "We will donate blood at the local hospistal starting from",
      start: '2024-01-12T04:00',
      end: '2024-01-14T09:00'
    }

  ];

  // Initialize FullCalendar
  $('#customCalendar').fullCalendar({
    selectable: true,
    selectableHelper: true,
    contentHeight: 400,
    aspectRatio: 1.6,

    select: function (start, end, jsEvent, view) {
      displayEventInfo(start);
    },

    header: {
      left: 'month, agendaDay',
      right: 'prev, next',
      center: 'title'
    },

    buttonText: {
      today: 'Today',
      month: 'Month', 
      day: 'Day',
      list: 'List'
    }, 

    events: events
  });

  // Function to display event information in the sidebar
  function displayEventInfo(date) {
    var carouselInner = document.getElementById('carouselInner');
    var carouselEvents = document.getElementById('carouselEvents');
    var eventsOnDate = events.filter(event => moment(event.start).isSame(date, 'day'));

    if (eventsOnDate.length > 0) {
      carouselInner.innerHTML = ''; // Clear previous content

      eventsOnDate.forEach((event, index) => {
        var eventInfo = document.createElement('div');
        eventInfo.classList.add('carousel-item');

        if (index === 0) {
          eventInfo.classList.add('active'); // Make the first event active
        }

        var eventContent = document.createElement('div');
        eventContent.classList.add('carousel-content');
        eventContent.innerHTML = `<h5>${event.title}</h5><p>${event.description}</p>`;
        eventInfo.appendChild(eventContent);

        carouselInner.appendChild(eventInfo);
      });

      carouselEvents.style.display = 'block'; // Show the carousel
    } else {
      carouselInner.innerHTML = '<div class="carousel-item active"><div class="carousel-content"><p>No events on this day.</p></div></div>';
      carouselEvents.style.display = 'block'; // Show the carousel with no events message
    }
  }
});
