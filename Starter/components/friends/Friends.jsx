import React, { useCallback, useEffect, useState } from "react";
import * as friendsService from "../../services/friendsService";
import Friend from "./FriendTemplate";
import { Link, useNavigate } from "react-router-dom";
import toastr from "toastr";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";

function Friends(props) {
  const [pageData, setPageData] = useState({
    friendsList: [],
    friendsMapped: [],
    show: true,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [indexNumber, setIndexNumber] = useState(0);
  const [total, setTotal] = useState();
  const [pageSize] = useState(4);

  const pageChange = (page) => {
    setIndexNumber(page - 1);
  };

  const navigate = useNavigate();

  useEffect(() => {
    loginCheck();
    console.log(props);
  }, [indexNumber]);

  const loginCheck = () => {
    if (props.user.isLoggedIn === true) {
      getFriends();
    } else {
      console.log("Not logged in");
    }
  };

  const getFriends = () => {
    friendsService
      .get(indexNumber, pageSize)
      .then(getFriendsSuccess)
      .catch(getFriendsError);
  };

  const getFriendsSuccess = (response) => {
    let friendsArray = response.data.item.pagedItems;
    let pageTotal = response.data.item.totalCount;

    setPageData((prevState) => {
      let data = { ...prevState };
      data.friendsList = friendsArray;
      data.friendsMapped = friendsArray.map(friendMapper);
      return data;
    });
    console.log(pageData);
    setTotal(pageTotal);
  };

  const getFriendsError = (response) => {
    console.log(response);
  };

  const friendMapper = (friend) => {
    return (
      <Friend
        friend={friend}
        onDeleteClick={deleteButtonClicked}
        onEditClick={editButtonClicked}
        key={friend.id}
      />
    );
  };

  const friendToggleButton = () => {
    setPageData((prevState) => {
      const toggle = { ...prevState };
      toggle.show = !prevState.show;
      return toggle;
    });
  };

  const deleteButtonClicked = useCallback((friend) => {
    const id = friend.id;
    friendsService.remove(id).then(deletePerson).catch(deleteFriendsError);
  }, []);

  const deletePerson = (id) => {
    setPageData((prevState) => {
      let data = { ...prevState };
      data.friendsList = [...data.friendsList];

      const indexOfFriend = data.friendsList.findIndex((friend) => {
        let result = false;
        if (friend.id === id) {
          result = true;
        }
        return result;
      });

      if (indexOfFriend >= 0) {
        data.friendsList.splice(indexOfFriend, 1);
        data.friendsMapped = data.friendsList.map(friendMapper);
      }
      return data;
    });
  };

  const deleteFriendsError = (response) => {
    console.log(response);
  };

  const editButtonClicked = useCallback((friend) => {
    const id = `/friends/${friend.id}`;
    navigate(id);
  }, []);

  const searchFieldChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setSearchTerm(() => {
      const newSearch = {
        ...searchTerm,
      };
      newSearch[name] = value;
      return newSearch;
    });
  };

  const onSearchSubmt = (e) => {
    e.preventDefault();
    const search = searchTerm.friendName;
    if (searchTerm.friendName.length >= 1) {
      friendSearch(search);
    } else {
      getFriends();
    }
  };

  const friendSearch = (search) => {
    friendsService
      .search(0, 4, search)
      .then(searchFriendsSuccess)
      .catch(searchFriendsError);
  };

  const searchFriendsSuccess = (response) => {
    let searchResults = response.data.item.pagedItems;
    let pageTotal = response.data.item.totalCount;
    setPageData(() => {
      let data = { ...pageData };
      data.friendsList = searchResults;
      data.friendsMapped = searchResults.map(friendMapper);
      return data;
    });
    setTotal(pageTotal);
  };

  const searchFriendsError = (error) => {
    console.log(error);
    return toastr["error"]("Search Unsuccessful.", "Error");
  };

  // const conditionRender = () =>{
  //   searchTerm.length > 0 ? handlSearch(pageindex) : page
  // }
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="col">
          <div className="row text-center mt-3">
            <h1>Friends</h1>
          </div>
          <div className="row justify-content-between p-1">
            <div className="col-1 align-content-start">
              <Link to="/friends/new" type="button" className="btn btn-warning">
                Add Friend
              </Link>
            </div>
            <div className="col-3">
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  name="friendName"
                  type="search"
                  placeholder="Search Friends"
                  onChange={searchFieldChange}
                />
                <button
                  className="btn btn-outline-secondary"
                  name="friendSearchButton"
                  type="button"
                  onClick={onSearchSubmt}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="row">
            <button
              type="button"
              className="btn btn-dark mt-1"
              onClick={friendToggleButton}
            >
              Toggle Friends
            </button>
          </div>
          <div className="row justify-content-between">
            {pageData.show && pageData.friendsMapped}
          </div>
        </div>
        <div className="row justify-content-center text-center mt-3">
          {pageData.show && (
            <Pagination
              onChange={pageChange}
              defaultCurrent={indexNumber}
              total={total}
              pageSize={pageSize}
              locale={locale}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Friends;
