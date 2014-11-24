var election = new Datamap({
  scope: 'usa',
  element: document.getElementById('map_election'),
  geographyConfig: {
    highlightBorderColor: '#bada55',
    highlightBorderWidth: 3
  },

  }
});
election.labels();