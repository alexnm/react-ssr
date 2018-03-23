import React from "react";
import { shallow } from "enzyme";
import Layout from "../src/js/components/Layout";

describe( "Layout suite", () => {
    it( "should render one <Layout /> component", () => {
        const wrapper = shallow( <Layout /> );
        expect( wrapper.length ).toBe( 1 );
    } );

    it( "should display a h1 with the title from state", () => {
        const wrapper = shallow( <Layout /> );
        const header = wrapper.find( "h1" ).text();
        const state = wrapper.state( [ "title" ] );
        expect( state ).toEqual( header );
    } );
} );
