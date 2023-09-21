import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from 'pages/styles/Home.module.css';
import Link from 'next/link';
import Masonry from 'react-masonry-css'
const inter = Inter({ subsets: ['latin'] });
import axios from 'axios';
import { Button } from '@mui/material';

export default function Home({ images }) {
  const [result, setResult] = useState([]);
  // const [width, setWidth] = useState(window.screen.width / 3)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false)
  // const resize = () => {
  //     setWidth(window.screen.width / 3)
  // }

  const authenticate = (mail, password) => {
    axios
      .post('http://localhost:1337/api/auth/local', {
        identifier: mail,
        password: password,
      })
      .then(response => {
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        setAuthenticated(true); // Aquí se cambia el estado a autenticado
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    authenticate(email, password);
  };
 

  useEffect(() => {
    if(authenticated){
      const fetchData = async () => {
          const resulting = await fetch("http://localhost:1337/api/posts?populate=*");
          const data = await resulting.json();
  
          setResult(data.data);
        };
        fetchData();
    }
}, [authenticated]);

  // useEffect(() => {
  //   window.addEventListener("resize", resize)
  //   return () => window.removeEventListener("resize",resize)
    
  // },[resize]  
  // )
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
  
  return (
    <>
      <Head>
        <title>thisBlog</title>
        <meta title="description" content="This is an example of our blog" />
      </Head>
      <div className={styles.container}>
        <h1>Blog Post Links:</h1>
        {!authenticated ? (
            
            <form className={styles.formContainer} onSubmit={handleSubmit}>
            <label>
              <p>Email</p>
              <input className={styles.inputField} type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
              <p>Password</p>
              <input className={styles.inputField} type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
            <Button type="submit" className={styles.inputField} onClick={handleSubmit}> Submit </Button>
            </div>
          </form>
      
        ) : (
          <Masonry
            breakpointCols={3}
            className={styles.mymasonrygrid}
            columnClassName={styles.mymasonrygridcolumn}>
            {console.log(result) || result && result.length ?
                      result.flatMap((item, index) => {
                        const imageAttributes = item.attributes.image.data.attributes;
                        const width = 435
                          return <Link href={`/posts/${item.id}`}>
                            <Image
                              src={'http://localhost:1337' + imageAttributes.url}
                              alt="blog-post"
                              priority={true}
                              width={width}
                              height={imageAttributes.height/imageAttributes.width*width}
                            />
                          
                          </Link>}
                      
                      )
                    : (
                      <p>Loading...</p>
                    )}
          </Masonry>
        )}

        {/* {result && result.length ?
          result.flatMap((item, index) => (
            <div className={styles.flexing} key={item.id} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <Link href={`/posts/${item.id}`}>
                <Image
                  src={link[index]}
                  alt="blog-post"
                  priority={true}
                  className="rounded-full"
                  width={300}
                  height={300}
                />
                <h2>{item.attributes.title}</h2>
                <div>
                  <p>{item.attributes.description}</p>
                </div>
              </Link>
            </div>
          ))
        : (
          <p>Loading...</p>
        )} */}
      
      </div>
    </>
  );
}
