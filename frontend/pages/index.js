import { Button, Alert } from 'reactstrap'
import { Col, Input, InputGroup, InputGroupAddon,Row} from 'reactstrap'
import RestaurantList from '../components/RestaurantList'
import {useState} from 'react'

export default () => {
    const [query, updateQuery] = useState('')
    return (
        <div className = 'container-fluid'>
            <Row>
                <Col>
                    <div className='search'>
                        <InputGroup>
                            <InputGroupAddon addonType='append'>Seach</InputGroupAddon>
                            <Input
                            onChange = {e => updateQuery(e.target.value.toLocaleLowerCase())}
                            value={query}
                            />
                        </InputGroup>
                    </div>
                    <RestaurantList search={query} />
                </Col>
            </Row>
        </div>
    )
}
