import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Link from 'next/link'
import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Row,
    Col
} from 'reactstrap'

const QUERY = gql`
{
    restaurants {
        id
        name
        image {
            url
        }
    }
}
`

const RestaurantList = (props) =>
{
    const {loading,error,data} = useQuery(QUERY)
    if(error) return "Error loading restaurants"
    console.log(data)
    if(loading) return <h1>Fetching....</h1>

    if(data.restaurants && data.restaurants.length)
    {
        const searchQuery = data.restaurants.filter((restaurant) => 
        {
            return restaurant.name.toLowerCase().includes(props.search)
        })
        console.log(searchQuery)
        if (searchQuery.length)
        {
            return (
                <Row>
                    {
                        searchQuery.map(restaurant => 
                        (
                            <Col xw='6' sm='4' key={restaurant.id}>
                                <Card style={{margin:'0 0.5rem 20px 0.5rem'}}>
                                    <CardImg
                                        top
                                        style={{height:250}}
                                        src={`${process.env.NEXT_PUBLIC_API_URL}${restaurant.image[0].url}`}
                                    />
                                    <CardBody>
                                        <CardTitle>{restaurant.name}</CardTitle>
                                        <CardText>{restaurant.description}</CardText>
                                    </CardBody>
                                    <div className = 'card-footer'>
                                        <Link
                                        as={`/restaurants/${restaurant.id}`}
                                        href={`/restaurants?id=${restaurant.id}`}
                                        >
                                            <a className='btn btn-primary'>Voir</a>
                                        </Link>
                                    </div>
                                </Card>
                            </Col>
                        ))
                    }
                    <style jsx global>
                        {`
                        a {
                            color: white;
                        }
                        a:link {
                            text-decoration:none;
                            color:white;
                        }
                        a:hover {
                            color:white;
                        }
                        .card-columns {
                            column-count
                        }
                        `}
                    </style>
                </Row>
            )
        } else
        {
            return <h1>Pas de restaurants trouvé</h1>
        }
    }
    return <h5>Add Restaurants</h5>
}

export default RestaurantList