export const StyledAddLink = () =>
  `
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2;
  
  .modal_ {
    /* border: 2px solid blue; */
    background-color: white;
    z-index: 1;
    text-align: center;
    margin: 0 auto;
    margin-top: 10%;
    max-width: 500px;
    border-radius: 6px;
  }
  .top {
    display: flex;
    justify-content: space-between;
    padding: 13px 18px 13px 25px;
    border-bottom: 1px solid #ddd;
    font-size: 1.6rem;
    margin-bottom: 14px;
    height: 64px;
    align-items: center;
  }
  
  .modal_name {
    font-weight: 500;
    font-size: larger;
  }
  
  .modal_group {
    position: relative;
  }
  .add_link_form {
    display: flex;
    justify-content: space-between;
    padding: 0 13px 13px 13px;
  }
  #form-key {
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 12px 8px;
    margin: 0;
    color: #000;
    width: 365px;
  }
  .add-btn {
    background-color: #3f65f2;
    padding: 5px 30px;
    border: 1px solid transparent;
    border-radius: 5px;
    color: white;
    font-size: 1.6rem;
    font-weight: 700;
    transition: 200ms ease-out;
    cursor: pointer;
  }
  
  .add-btn:hover {
    background-color: #3059f3;
  }
  
  .modal_close:hover {
    cursor: pointer;
  }
  
  .root-modal-open {
    filter: blur(7px);
  }
`
