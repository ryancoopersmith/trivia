import Quiz from '../src/components/Quiz';

describe('Quiz', () => {
  let wrapper;

  beforeEach(() => {
    spyOn(global, 'fetch').and.returnValue(
      createResponseFromFixture('categories/a-plus')
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('plays the quiz', () => {
    beforeEach(() => {
      wrapper = mount(
        <App />
      );
    });

    it('starts the quiz on click', done => {
      setTimeout(() => {
        let quiz = wrapper.findWhere(n => {
          return n.text() === '\'a\' Plus';
        });
        simulateIfPresent(quiz, 'click');
      }, 0);

      setTimeout(() => {
        let pageText = wrapper.text();
        expect(pageText).toMatch("Exit");
        expect(pageText).toMatch("'a' Plus");

        expect(pageText).not.toMatch("'a' Science category");
        expect(pageText).not.toMatch("'a'ncient Greeks");
      }, 0);
    });

    it('exits the quiz on click', done => {
      setTimeout(() => {
        let exit = wrapper.findWhere(n => {
          return n.text() === 'Exit';
        });
        simulateIfPresent(exit, 'click');
      }, 0);

      setTimeout(() => {
        let pageText = wrapper.text();

        expect(pageText).not.toMatch("Exit");
        expect(pageText).not.toMatch("'a' Plus");

        expect(pageText).toMatch("'a' Science category");
        expect(pageText).toMatch("'a'ncient Greeks");
        done();
      }, 0);
    });
  });
});
