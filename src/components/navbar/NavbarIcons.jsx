import '../../style/navbarIcons.css'
import { Notifications } from './/Notifications'
import { Account } from './Account'
import { Searcher } from './Searcher'

export const NavbarIcons = ({ query, setQuery }) => {       

    return (
        <div className='navbar-icons'>
            <Searcher query={query} setQuery={setQuery} />
            <Notifications />
            <Account />
        </div>
    )
}