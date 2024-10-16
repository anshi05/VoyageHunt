import { ScrollView } from 'react-native'
import FormUI from '../../components/ui/Form'
import { IsLoggedInContext } from '../context/isLoginContext';

const AddEvent = () => {
    const { eventsData, setEventsData } = useContext(IsLoggedInContext);
    return (
        <ScrollView>
            <FormUI />
        </ScrollView>
    )
}

export default AddEvent