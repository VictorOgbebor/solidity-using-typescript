pragma solidity ^0.8.9;
error USER_DOES_NOT_EXIST();

contract CRUD {
    struct User {
        uint id;
        string name;
    }

    User[] public users;
    uint public ID = 1;

    function CreateUser(string memory _name) external {
        users.push(User({id: ID, name: _name}));
        ID++;
    }

    function UpdateUser(uint _id, string memory _name) public {
        uint i = look(_id);
        users[i].name = _name;
    }

    function ReadUser(uint _id) public view returns (uint, string memory) {
        uint i = look(_id);
        return (users[i].id, users[i].name);
    }

    function DeleteUser(uint _id) public {
        uint i = look(_id);
        delete users[i];
    }

    function look(uint _id) internal view returns (uint) {
        for (uint i = 0; i < users.length; i++) {
            if (users[i].id == _id) {
                return i;
            }
        }
        revert USER_DOES_NOT_EXIST();
    }
}
