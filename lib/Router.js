/**
 *  Router class. Router can be used to transle paths into actions that should
 *  be taken.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// the privates
const paths = Symbol('paths');

// expose the class
module.exports = class Router {

    /**
     *  Initialize the router
     */
    constructor() {

        /**
         *  The paths array
         *  @var    Array
         */
        this[paths] = [];
    }

    /**
     *  Return number of stored paths.
     *  @return int
     */
    get length() { return this[paths].length; }

    /**
     *  Append new route to the router
     *  @param  string      The path pattern.
     *  @param  function    The callback that should be executed
     *  @return Router
     */
    append(pattern, callback) {

        // remember the path
        this[paths].push(new Route(pattern, callback));

        // allow chaining
        return this;
    }

    /**
     *  Resolve given path.
     *  @param  string
     */
    resolve(path) {

        // iterate over the paths
        for (let route of this[paths]) {

            // make a match on the path
            let result = route.match(path);

            // do we have a result? then we can to exec the route
            if (result) route.exec(result);
        }
    }
}
