'use client'
import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick, searchText}) => {
  if(searchText){
    data = data.filter(post => post.tag.toLowerCase().includes(searchText.toLowerCase()) || post.prompt.toLowerCase().includes(searchText.toLowerCase()) || post.creator.username.toLowerCase().includes(searchText.toLowerCase()))
  }
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post) =>(
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }
  const handleTagClick = (tag) => {
    setSearchText(tag)
  }
  useEffect(() => {
    const fetchPosts = async() => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data)
    }
    fetchPosts();
  },[])
  return (
    <section className='feed'>
      <form action="" className='relative w-full flex-center'>
        <input 
          type="text" 
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'        
        />
      </form>
      <PromptCardList 
        data={posts}
        handleTagClick={handleTagClick}
        searchText={searchText}
      />
    </section>
  )
}

export default Feed
