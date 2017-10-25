// Setup Enzyme to test React renderign components. 
// Path to this file is set inside jest.config.js

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });