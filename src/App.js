import React,{useState} from 'react';
import {Grid} from '@material-ui/core';

// import SearchBar from './components/SearchBar';
// import VideoDetail from './components/VideoDetail';
// import VideoList from './components/VideoList';
// after adding index file
 import {SearchBar,VideoDetail,VideoList} from './components';

import youtube from './api/youtube';
import API_KEY from '../env/apikey'

class App extends React.Component{
    state = {
        videos:[],
        selectedVideo:null
    };

    onVideoSelect=({video})=>{   
        if(video == null){
            console.log("video null");
        }     
        this.setState({selectedVideo:video});
    }
    handleSubmit = async(searchTerm)=>{
        const response = await youtube.get('search',
        {params:{
            part:'snippet',
            maxResults:5,
            key:API_KEY,
            q:searchTerm
        }}
        );
        console.log(response.data.items);
        this.setState({videos:response.data.items,selectedVideo:response.data.items[0]});
    }


    render(){
        const{selectedVideo,videos} = this.state;
        return (
            <Grid justify="center" container spacing={10} >
                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            {/* Search bar */}
                            <SearchBar onFormSubmit={this.handleSubmit}/>
                        </Grid>
                        <Grid item xs={8}>
                            {/* Video Details */}
                            <VideoDetail video={selectedVideo}/>
                        </Grid>
                        <Grid item xs={4}>
                            {/* Video List */}
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App;
