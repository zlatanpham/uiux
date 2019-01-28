import * as React from 'react';
import { css } from 'emotion';

class SkewHandler extends React.Component {
  div: React.RefObject<HTMLDivElement> = React.createRef();
  skewY: number = 0;
  prevWindowScrollY: number = 0;
  timer: number = 0;
  animationFrame: number = 0;

  handleSkew = (e: UIEvent) => {
    window.clearTimeout(this.timer);
    const { scrollY } = window;

    const up = this.prevWindowScrollY < scrollY;
    this.prevWindowScrollY = scrollY;
    this.animationFrame = window.requestAnimationFrame(() => {
      this.skewY = up ? this.skewY + 0.3 : this.skewY - 0.3;
      if (Math.abs(this.skewY) > 15) {
        this.skewY = 15;
      }
      // @ts-ignore
      this.div.current.style = `transform:skewY(${this.skewY}deg)`;
    });
    this.reset();
  };

  reset() {
    this.timer = window.setTimeout(() => {
      //   console.log(12);
      this.animationFrame = window.requestAnimationFrame(() => {
        console.log(this.skewY);
        if (Math.abs(this.skewY) <= 0.3) {
          this.skewY = 0;
          window.clearTimeout(this.timer);
          window.cancelAnimationFrame(this.animationFrame);
          // @ts-ignore
          this.div.current.style = `transform:skewY(${this.skewY}deg)`;
        } else {
          this.skewY = this.skewY > 0 ? this.skewY - 0.3 : this.skewY + 0.3;

          // @ts-ignore
          this.div.current.style = `transform:skewY(${this.skewY}deg)`;
          this.reset();
        }
      });
    }, 1000 / 60);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleSkew);
  }

  render() {
    return (
      <div style={{ minHeight: '2000px' }}>
        <div
          ref={this.div}
          className={css({
            height: '500px',
            backgroundColor: 'red',
            margin: '1000px auto',
            color: 'white',
          })}
        >
          <h1>Many text inside here</h1>
          <p>
            Consectetur magna laborum culpa nostrud tempor quis. Laborum
            reprehenderit deserunt sit fugiat nisi deserunt officia consectetur
            sunt aliqua elit. Dolore fugiat do officia id minim Lorem aliqua qui
            non laborum pariatur quis. Reprehenderit qui magna ut exercitation
            nulla mollit quis eu culpa culpa exercitation do Lorem. Laboris esse
            qui magna enim. Veniam labore velit sunt Lorem. Anim consequat amet
            quis excepteur laboris consequat aliquip dolor esse consectetur
            Lorem nostrud anim officia. Sit ex nostrud ipsum sit consequat anim.
            Pariatur fugiat ea tempor eu excepteur cillum minim eu aute Lorem
            dolor deserunt duis exercitation. Eiusmod ad nostrud laboris
            voluptate aliquip et adipisicing. Dolor irure et id Lorem sit
            aliquip. Tempor exercitation Lorem exercitation exercitation non
            officia.
          </p>
        </div>
      </div>
    );
  }
}

export default SkewHandler;
