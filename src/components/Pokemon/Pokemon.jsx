import './Pokemon.css'
function Pokemon({name,image}){
    return(
        <div className='pokemon'>
           <a href='/Pokemon'>
           <div className='pokemon-name'>
            {name}
            </div>
            <div>
                <img className='pokemon-image' src="{image}" />
            </div>
        </div> </a>
        
    )
}

export default Pokemon; 