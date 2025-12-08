import React from "react";
import useBookmarks from "../hooks/useBookmarks";

const Bookmarks = () => {
  const { bookmarks, loading, error, toggleBookmark } = useBookmarks();

  if (loading) return <p>Loading bookmarks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    // <div>
    //   <h2>Your Bookmarks</h2>
    //   {bookmarks.length === 0 ? (
    //     <p>No bookmarks yet.</p>
    //   ) : (
    //     <ul>
    //       {bookmarks.map((item) => (
    //         <li key={item.tconst}>
    //           {item.title}{" "}
    //           <button onClick={() => toggleBookmark(item.tconst)}>
    //             Toggle
    //           </button>
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
  <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
   <div class="modal-body">
  <h2 class="fs-5">Popover in a modal</h2>
  <p>This <button class="btn btn-secondary" data-bs-toggle="popover" title="Popover title" data-bs-content="Popover body content is set in this attribute.">button</button> triggers a popover on click.</p>
  <hr/>
  <h2 class="fs-5">Tooltips in a modal</h2>
  <p><a href="#" data-bs-toggle="tooltip" title="Tooltip">This link</a> and <a href="#" data-bs-toggle="tooltip" title="Tooltip">that link</a> have tooltips on hover.</p>
</div>
</div>
 
  );
};

export default Bookmarks;
