import { setup } from "lib/csrf";
import axios from 'axios';

export const SecureForm = () => {
    const onSubmit = async (event) => {
        event.preventDefault();
        axios.post('/api/protected', {}).then((data) => {
            console.log(data);
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Enter Data" name="dataField" />
            <button>submit</button>
        </form>
    )
}

export const getServerSideProps =  async ({ req, res }) => ({ props: {} });

export default SecureForm;