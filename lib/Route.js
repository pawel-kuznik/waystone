/**
 *  The route class.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// the privates
const pattern   = Symbol('pattern');
const callback  = Symbol('callback');
const regex     = Symbol('regex');

// export the route
module.exports = class Route {

    /**
     *  The constructor
     *  @param  string      The pattern for the route
     *  @param  function    The callback of the route
     */
    constructor (_pattern, _callback) {

        // store the pattern and the callback
        this[pattern] = _pattern;
        this[callback] = _callback;

        // the sanitized pattern that will use to create a regex that we can
        // use to get the data from a path
        var sanitizedPattern = _pattern;

        // ensure that nothing else would be cought
        sanitizedPattern = '^' + sanitizedPattern + '$';

        // replace capture slugs with regexes
        sanitizedPattern = sanitizedPattern.replace(/\/\:[a-z0-9]+/gi, '/([a-z0-9]+)');

        // create the regex
        this[_regex] = new RegExp(sanitizedPattern, 'i');
    }

    /**
     *  Does the route match a certain path?
     *
     *  @param  string
     *  @return object|false    If the route can na executed it will return a
     *                          plain object with the data from the path. If the
     *                          path doesn't match the FALSE is returned.
     */
    match (path) {

        // make the regex match
        var result = this[_regex].exec(path);

        // if we have a negative result we will just return false
        if (!result) return false;

        //  get all params
        var params = this[_pattern].match(/\:([a-z0-9]+)/ig);

        // prepare a data vairable
        var data = { };

        // iterate over the results
        for (var idx in params) data[params[idx].substring(1)]= result[parseInt(idx)+1];

        // return the data from the path
        return data;
    }

    /**
     *  Execute the route with given set of data.
     */
    exec(data = { }) {

        // call the callback with given data
        this[callback](data);
    }
}
