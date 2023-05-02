import { configure } from 'enzyme';
import '@testing-library/jest-dom';
import Adapter from 'enzyme-adapter-preact-pure';
import './testMocks/matchMedia';
import './testMocks/i18nMock';
import './testMocks/resourcesMock';

configure({ adapter: new Adapter() });
