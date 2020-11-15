import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios'
import post from '../../components/Post/Post';
class Blog extends Component {
    state = {
        posts:[],
        selectedPostId: null,
        error:false
    }
    componentDidMount()
    {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(response=>{
            const posts = response.data.slice(0,4)
            
            const updatedPosts = posts.map((post)=>{
                return {
                    ...post,
                    author:'Max'
            }
            })
            // console.log(updatedPosts)
            this.setState({posts: updatedPosts})
        }).catch(error=>{
            this.setState({error:true})
        });
    }

    postClickedHandler = (id)=>{
        this.setState({selectedPostId:id})
    }

    render () {
        let posts = <p style={{textAlign:'center'}}>Something Went Wrong</p>
        if(!this.state.error)
        {
        posts = this.state.posts.map((post)=>{
            // console.log(post)
           return (<Post clicked={()=>(this.postClickedHandler(post.id))} author={post.author} key={post.id} title={post.title}/>)
        })
    }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;