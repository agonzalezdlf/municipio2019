/**
 * @author ISC. Israel de la Cruz Hdez.
 * @version 1.0, Date: 15/Jun/2011
 *
 */
package mx.gob.municipio.centro.view.controller.sam.contratos;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import mx.gob.municipio.centro.model.gateways.sam.GatewayBeneficiario;
import mx.gob.municipio.centro.model.gateways.sam.GatewayContratos;
import mx.gob.municipio.centro.model.gateways.sam.GatewayPlanArbit;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUnidadAdm;
import mx.gob.municipio.centro.view.bases.ControladorBase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/sam/contratos/lista_contratos.action")
public class ControladorListadoContratos extends ControladorBase {

	@Autowired
	private GatewayContratos gatewayContratos;
	@Autowired
	private GatewayUnidadAdm gatewayUnidadAdm;
	@Autowired
	private GatewayPlanArbit gatewayPlanArbit;
	@Autowired
	private GatewayBeneficiario gatewayBeneficiario;
	
	public ControladorListadoContratos() {
		// TODO Auto-generated method stub

	}
	public final static  int VER_TODAS_LAS_UNIDADES = 25;
	
	@SuppressWarnings("unchecked") 
	@RequestMapping(method = {RequestMethod.GET,RequestMethod.POST})  
	public String  requestGetControlador( Map modelo, HttpServletRequest request) {
		boolean privilegio = this.getPrivilegioEn(this.getSesion().getIdUsuario(), VER_TODAS_LAS_UNIDADES);
		String unidad=request.getParameter("cbodependencia")==null ? this.getSesion().getClaveUnidad() : request.getParameter("cbodependencia");
		//String estatus=request.getParameter("status")==null ? Integer.toString(gatewayContratos.CON_STATUS_EDICION): this.arrayToString(request.getParameterValues("status"),",");
		String cbostatus=request.getParameter("cbostatus")==null ? Integer.toString(gatewayContratos.CON_STATUS_EDICION): this.arrayToString(request.getParameterValues("cbostatus"),",");//Componente status
		String tipoGasto=request.getParameter("cbotipogasto");
		String num_contrato=request.getParameter("txtcontrato");
		String cve_benefi= request.getParameter("cboprestadorservicio");
		String beneficiario=request.getParameter("cboprestadorservicio");//beneficiario
		String txtproyecto=request.getParameter("txtproyecto")==null ? "": request.getParameter("txtproyecto");
		String txtpartida=request.getParameter("txtpartida");
		String txtcontrato=request.getParameter("txtcontrato");
		String verUnidad=request.getParameter("verUnidad");
		String estatus=request.getParameter("cbostatus")==null ? Integer.toString(gatewayContratos.CON_STATUS_EDICION): this.arrayToString(request.getParameterValues("cbostatus"),",");//Componente status
		
		modelo.put("idUnidad", unidad);
		modelo.put("ejercicio",this.getSesion().getEjercicio());
		modelo.put("fechaInicial",(request.getParameter("fechaInicial")==null ? "": request.getParameter("fechaInicial")));
		modelo.put("fechaFinal",(request.getParameter("fechaFinal")==null ? "": request.getParameter("fechaFinal")));
		modelo.put("status",estatus);
		modelo.put("tipo_gto",tipoGasto );
		modelo.put("CVE_BENEFI",cve_benefi );
		modelo.put("beneficiario", beneficiario);
		modelo.put("verUnidad",verUnidad);
		modelo.put("txtproyecto",txtproyecto);
		modelo.put("txtpartida",txtpartida);
		modelo.put("txtcontrato",txtcontrato);
		modelo.put("cbostatus",estatus);
		modelo.put("nombreUnidad",this.getSesion().getUnidad());
		modelo.put("clv_benefi",gatewayBeneficiario.getBeneficiariosTodos(0));
		Map xmod = new HashMap();
		xmod.putAll(modelo);
		modelo.put("listado", gatewayContratos.getListaContratos(xmod));
	    return "sam/contratos/lista_contratos.jsp";
	}
	
	@ModelAttribute("unidadesAdmiva")
    public List<Map<String, Object>> getUnidades(){
    	return gatewayUnidadAdm.getUnidadAdmTodos();	
    }
	
	@ModelAttribute("tipodeGasto")
    public List<Map<String, Object>> getTiposDeGasto(){
    	return gatewayPlanArbit.getTipodeGasto();
    }
	
	@ModelAttribute("beneficiarios")
	public List<Map<String, Object>> getBeneficiarios(){
		return gatewayBeneficiario.getListaBeneficiarios();
	}
	
	/*public List <Map> getListaContratos(String num_contrato, String unidad ,String cve_benefi,  String estatus, String fechaInicial, String fechaFinal, String tipo_gto, Integer ejercicio, Integer idUsuario, String  verUnidad, String cve_uniusr,  boolean privilegio){
		return this.gatewayContratos.getListaContratos(num_contrato,unidad, cve_benefi, estatus,this.formatoFecha(fechaInicial) , this.formatoFecha(fechaFinal),  tipo_gto, ejercicio,idUsuario, verUnidad, cve_uniusr, privilegio);
	}*/
	public String aperturarContratos(List<Long> lst_contratos){
		return gatewayContratos.aperturarContratos(lst_contratos, this.getSesion().getEjercicio(), this.getSesion().getIdUsuario());
	}
	
	public String cancelarContrato(List<Long> lst_contratos){
		return gatewayContratos.cancelarContrato(lst_contratos, this.getSesion().getEjercicio(), this.getSesion().getIdUsuario());
	}
	
	public List<Map<String, Object>> getConceptosContrato(Long cve_contrato){
		return this.gatewayContratos.getConceptosContrato(cve_contrato);
	}
	
	public List<Map<String, Object>> getMovimientosAjustadosContrato(Long cve_contrato)
	{
		return this.gatewayContratos.getMovimientosAjustadosContrato(cve_contrato);
	}

}
