import {actions, follow, unfollow} from "./users-reducer";
import {usersAPI} from "../api/users-api";
import {Ifollow, IResponseAPI, ResultCodesEnum} from "../api/api";

jest.mock("../api/users-api")
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: IResponseAPI = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {}
}

test('follow user', async () => {

  const dispatch = jest.fn();
  const getState = jest.fn();

  usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
  await follow(1)(dispatch, getState, {})

  expect(dispatch).toBeCalledWith(actions.toggleIsFollowingAC(true, 1))
  expect(dispatch).toBeCalledWith(actions.followSuccess(1));
  expect(dispatch).toBeCalledWith(actions.toggleIsFollowingAC(false, 1));
})

test('unfollow user', async () => {

  const dispatch = jest.fn();
  const getState = jest.fn();

  usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))
  await unfollow(1)(dispatch, getState, {})

  expect(dispatch).toBeCalledTimes(3)
  expect(dispatch).toBeCalledWith(actions.toggleIsFollowingAC(true, 1))
  expect(dispatch).toBeCalledWith(actions.unfollowSuccess(1));
  expect(dispatch).toBeCalledWith(actions.toggleIsFollowingAC(false, 1));
})