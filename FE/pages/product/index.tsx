import { withAuth } from '../../auth/Auth';
const data = [{ name: 'foo', value: 'bar' }, { name: 'f1', value: 'bar1' }]
const ListProduct = () => {

    const createItem = () => {

    }
    return <>
        <input type="text"  />
        <h1>List product</h1>
        <table>
            <thead>
                <tr>
                    {data.map((item, index) =>
                        <th key={index}>{item.name}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {data.map((item, index) =>
                        <td key={index + 1}>{item.value}</td>
                    )}
                </tr>
            </tbody>
        </table>
    </>
}
export default withAuth(ListProduct) 