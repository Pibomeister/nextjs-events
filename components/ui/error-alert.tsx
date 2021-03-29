import classes from './error-alert.module.scss';

export default function ErrorAlert(props) {
  return <div className={classes.alert}>{props.children}</div>;
}