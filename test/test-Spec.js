describe('sorting the list of lobbies', function() {
  it('sorts in descending order by default', function() {
    var lobbies = ['jack', 'igor', 'jeff'];
    var sorted = lobbies;
    expect(sorted).toEqual(['jeff', 'jack', 'igor']);
  });
});
