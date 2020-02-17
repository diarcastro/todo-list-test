export const enum EItemPriority {
    Low = 'Low',
    Medium = 'Medium',
    Heigh = 'High',
}

export class Item {
    id: number;
    title: string;
    priority?: EItemPriority;
    deadline?: string;

    constructor () {

    }

    getTemplate (): string {
        const priority = this.priority && `<strong>Prioriry: </strong> ${this.priority} <br>`;
        const deadline = this.deadline && `<strong>Prioriry: </strong> ${this.deadline} <br>`;
        return `
        <div class="box">
            <article class="media">
                <div class="media-content">
                    <div class="content">
                    <p>
                        <strong>${this.title}</strong>
                        <br>
                        ${priority}
                        ${deadline}
                    </p>
                    </div>
                    <nav class="level is-mobile">
                    <div class="level-left">
                        <a class="level-item edit" data-id="${this.id}" aria-label="reply">
                            <span class="icon is-small">
                                <i class="far fa-edit" aria-hidden="true"></i>
                            </span>
                        </a>
                        <a class="level-item delete" data-id="${this.id}" aria-label="retweet">
                            <span class="icon is-small delete-icon">
                                <i class="fas fa-trash-alt" aria-hidden="true"></i>
                            </span>
                        </a>
                    </div>
                    </nav>
                </div>
            </article>
        </div>
        `;
    }
}