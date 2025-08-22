import '../style/navbarIcons.css'
import { Notifications } from './Notifications'
import { Profiles } from './Profiles'
import { Searcher } from './Searcher'

export const NavbarIcons = () => {       

    return (
        <div className='navbar-icons'>
            <Searcher />
            <Notifications />
            <Profiles />
        </div>
    )
}