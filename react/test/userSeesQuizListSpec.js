import App from '../src/components/App';

describe('Quiz List', () => {
  let wrapper;

  beforeEach(() => {
    spyOn(global, 'fetch').and.returnValue(
      createResponseFromFixture('quizList/quizList')
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('visit the home page', () => {
    beforeEach(() => {
      wrapper = mount(
        <App />
      );
    });

    it('has randomized quiz categories', done => {
      setTimeout(() => {
        let pageText = wrapper.text();
        expect(pageText).toMatch("'a' Plus");
        expect(pageText).toMatch("'a' Science category");
        expect(pageText).toMatch("'a'ncient Greeks");
        expect(pageText).not.toMatch("Give Me An 'a'!");

        done();
      },0);
    });
  });
});
