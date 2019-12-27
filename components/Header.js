import React, { useReducer } from 'react';
import '../styles/components/Header.scss';

const Header = ({ headerNav = [], initialState = false }) => {

    function init(initialState) {
        return { state: initialState };
    }

    function reducer(state, action) {
        switch (action.type) {
            case 'toggle':
                return { state: !state.active };
            case 'reset':
                return init(action.payload);
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState, init);

    const toggleMenu = () => {
        dispatch({ type: 'toggle', payload: initialState });
    }

    const createMenu = (menu, parent_key) => {
        let menuObj = menu.map((element, index) => {
            if (element.children) {
                return (
                    <li key={"header_" + parent_key + "_" + index}>
                        <a key={"header_" + parent_key + "_link_" + index} href={element.link}>{element.title}</a>
                        {createMenu(element.children, element.title)}
                    </li>
                );
            } else {
                return (<li key={"header_" + parent_key + "_" + index}><a href={element.link}>{element.title}</a></li>);
            }
        });

        return [].concat(<ul key={"header_wrapper"}><li key={"toggle_menu"}><button onClick={() => { toggleMenu(); }}>Menu</button></li>{menuObj}</ul>);
    }

    return (
        <header className={`header header--${state.active ? 'open' : 'closed'}`}>
            <nav>
                {createMenu(headerNav, "header")}
            </nav>
        </header>
    );
}

export default Header;