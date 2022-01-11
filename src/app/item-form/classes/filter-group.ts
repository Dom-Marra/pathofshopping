import { FormGroup } from "@angular/forms";
import { SimpleData } from "src/app/core/models/simple-data.model";
import { DefaultValueControl } from "./default-value-control";

export class FilterGroup {

    public name: string;
    public label: string;
    public filters:  Array<{
        name: string,
        label: string,
        type: string,
        defaultVal?: string,
        options?: Array<SimpleData>,
        additional?: Array<{
            name?: string,
            type?: string,
            label?:string
        }>
    }>;
    public parent: string;

    constructor(
        name: string, 
        label: string, 
        filters: Array<{
            name: string,
            label: string,
            type: string,
            defaultVal?: string,
            options?: Array<SimpleData>
            additional?: Array<{
                name?: string,
                type?: string,
                label?:string
            }>
        }>,
        parent?: string
    ) {
        this.name = name;
        this.label = label;
        this.filters = filters;
        this.parent = parent;
    }

    /**
     * Creates a form group based on filter group data
     */
    public toFormGroup(): FormGroup {
        const group = new FormGroup({});

        this.filters.forEach(filter => {
            const innerGroup = new FormGroup({});
            const defaultVal = filter.defaultVal ? filter.defaultVal : '';

            switch (filter.type) {
                case 'option':
                    innerGroup.addControl('option', new DefaultValueControl('', defaultVal));
                    break;
                case 'minmax':
                    innerGroup.addControl('min', new DefaultValueControl('', defaultVal));
                    innerGroup.addControl('max', new DefaultValueControl('', defaultVal));
                    break;
                case 'minmax_option':
                    innerGroup.addControl('min', new DefaultValueControl('', defaultVal));
                    innerGroup.addControl('max', new DefaultValueControl('', defaultVal));
                    innerGroup.addControl('option', new DefaultValueControl('', defaultVal));
                    break;
                case 'socket':
                    innerGroup.addControl('r', new DefaultValueControl('', defaultVal));
                    innerGroup.addControl('g', new DefaultValueControl('', defaultVal));
                    innerGroup.addControl('b', new DefaultValueControl('', defaultVal));
                    innerGroup.addControl('w', new DefaultValueControl('', defaultVal));
                    
                    innerGroup.addControl('min', new DefaultValueControl('', defaultVal));
                    innerGroup.addControl('max', new DefaultValueControl('', defaultVal));
                    break;
                default:
                    innerGroup.addControl('input', new DefaultValueControl('', defaultVal));
            }

            group.addControl(filter.name, innerGroup);
        });

        return group;
    }
}
