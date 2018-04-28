import axios from 'axios';
import serverURL from './serverURL';



var UserID = (function() {

    var getID = function() {
        return localStorage.getItem('ID');
    };

    var setID = function(data) {
        console.log(data);
        localStorage.setItem('ID', data)
    };

    var logout = function(){
        localStorage.setItem('ID', '');
    };

    return {
        setID: setID,
        getID: getID,
    }
  })();

export default UserID;
