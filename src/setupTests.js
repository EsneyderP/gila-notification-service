import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// module.exports = {
//     "moduleDirectories": [
//     "node_modules",
//     "<rootDir>/__mocks__"
//     ],
//     "testPathIgnorePatterns": [
//         "<rootDir>/node_modules/",
//         "node_modules/(?!axios)/",
//         "<rootDir>/__tests__/"
//     ],
// }