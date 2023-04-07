import { AddNote } from './AddNote'
import Notes from './Notes'

export const Home = (props) => {
    return (
        <div className="container mt-5">
            <AddNote showAlert={props.showAlert}/>
            <Notes showAlert={props.showAlert}/>
        </div>
    )
}

export default Home
