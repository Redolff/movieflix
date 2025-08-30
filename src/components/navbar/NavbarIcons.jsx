import '../../style/navbarIcons.css'
import { Notifications } from './/Notifications'
import { Profiles } from './Profiles'
import { Searcher } from './Searcher'

export const NavbarIcons = ({ query, setQuery }) => {       

    return (
        <div className='navbar-icons'>
            <Searcher query={query} setQuery={setQuery} />
            <Notifications />
            <Profiles />
        </div>
    )
}