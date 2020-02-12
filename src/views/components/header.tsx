import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = ( { loggedIn } ) => (
    <div>
        <Link to="/" className="link">Home</Link>
        <Link to="/about" className="link">About</Link>
        <Link to="/contact" className="link">Contact</Link>
        { loggedIn && <Link to="/secret" className="link">Secret</Link> }
    </div>
);

const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
} );

export default connect( mapStateToProps )( Header );
