
import styles from "./blogPage.module.css";

const NewsDetailPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{cat} Blog</h1>
      <div className={styles.content}>

      </div>
    </div>
  );
};

export default BlogPage;